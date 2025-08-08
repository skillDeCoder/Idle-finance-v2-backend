import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { ethers } from 'ethers';
import { ERC20_ABI } from '../abis/erc20';
import { SwapDto } from '../dtos/swap.dto';
import { fetchQuote, addresses } from '@mayanfinance/swap-sdk';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class KyberbridgeService {
  private logger = new Logger(KyberbridgeService.name);
  private chain = 'polygon';

  constructor(private readonly httpService: HttpService) {}

  async getGlm_PolQuote(amount: string): Promise<any> {
    const tokenIn = '0x0B220b82F3eA3B7F6d9A1D8ab58930C064A2b5Bf'; //glm
    const tokenOut = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE';
    const amountIn = ethers.parseEther(amount);

    try {
      const params = {
        tokenIn,
        tokenOut,
        amountIn,
      };
      const response = await this.httpService.axiosRef.get(
        `https://aggregator-api.kyberswap.com/${this.chain}/api/v1/routes`,
        {
          params,
          headers: {
            'X-Client-Id': `${process.env.KYBER_CLIENT_ID}`,
          },
        },
      );

      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  async buildSwapTransaction(swapData: SwapDto): Promise<any> {
    try {
      const route = await this.getGlm_PolQuote(swapData.amount);
      const routeSummary = route?.data?.routeSummary;

      if (!routeSummary) {
        throw new Error('No route summary found');
      }
      const swapDetails = {
        amountOut: ethers.formatEther(routeSummary.amountOut),
      };

      const payload = {
        routeSummary,
        sender: swapData.sender,
        recipient: swapData.sender,
        slippageTolerance: 10, // 0.1%
      };

      const response = await this.httpService.axiosRef.post(
        `https://aggregator-api.kyberswap.com/${this.chain}/api/v1/route/build`,
        payload,
        {
          headers: {
            'X-Client-Id': `${process.env.KYBER_CLIENT_ID}`,
          },
        },
      );

      if (!response.data.data) {
        throw new Error('No transaction data found');
      }
      return {
        encodedSwapData: response.data.data.data,
        routerContract: response.data.data.routerAddress,
        swapData: swapDetails,
      };
    } catch (error) {
      throw error;
    }
  }

  async buildSwapTransactionWithApproval(swapData: SwapDto): Promise<any> {
    try {
      const glm = '0x0B220b82F3eA3B7F6d9A1D8ab58930C064A2b5Bf';
      const route = await this.getGlm_PolQuote(swapData.amount);
      const routeSummary = route?.data?.routeSummary;

      if (!routeSummary) {
        throw new Error('No route summary found');
      }

      const swapDetails = {
        amountOut: ethers.formatEther(routeSummary.amountOut),
      };

      const payload = {
        routeSummary,
        sender: swapData.sender,
        recipient: swapData.sender,
        slippageTolerance: 10, // 0.1%
      };

      const response = await this.httpService.axiosRef.post(
        `https://aggregator-api.kyberswap.com/${this.chain}/api/v1/route/build`,
        payload,
        {
          headers: {
            'X-Client-Id': `${process.env.KYBER_CLIENT_ID}`,
          },
        },
      );

      if (!response.data.data) {
        throw new Error('No transaction data found');
      }
      const provider = new ethers.JsonRpcProvider(process.env.RPC_URL_ETH);

      const tokenContract = new ethers.Contract(glm, ERC20_ABI, provider);

      const currentAllowance = await tokenContract.allowance(
        swapData.sender,
        response.data.data.routerAddress,
      );

      let approveTxPayload;

      if (currentAllowance < ethers.parseEther(swapData.amount)) {
        console.log('Not approved ');
        const iFace = new ethers.Interface(ERC20_ABI);
        const data = iFace.encodeFunctionData('approve', [
          response.data.data.routerAddress,
          ethers.parseEther(swapData.amount),
        ]);

        // const decoded = iFace.decodeFunctionData('approve', data);
        // console.log('Decoded:', decoded);

        approveTxPayload = { to: glm, data, value: '0x0' };
      }
      return {
        approveTxPayload,
        encodedSwapData: response.data.data.data,
        routerContract: response.data.data.routerAddress,
        swapData: swapDetails,
      };
    } catch (error) {
      throw error;
    }
  }

  async bridgeTokentoBase(swapData: SwapDto): Promise<any> {
    const wEth = '0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2'; //etheruem
    const wPol = '0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270';
    const wEthBase = '0x0000000000000000000000000000000000000000';
    const amount = Number(swapData.amount);

    try {
      const provider = new ethers.JsonRpcProvider(process.env.RPC_URL_ETH);
      const tokenContract = new ethers.Contract(wPol, ERC20_ABI, provider);

      const currentAllowance = await tokenContract.allowance(
        swapData.sender,
        addresses.MAYAN_FORWARDER_CONTRACT,
      );
      let approveTxPayload;
      if (currentAllowance < ethers.parseEther(swapData.amount)) {
        console.log('Not approved ');
        const iFace = new ethers.Interface(ERC20_ABI);
        const data = iFace.encodeFunctionData('approve', [
          addresses.MAYAN_FORWARDER_CONTRACT,
          ethers.parseEther(swapData.amount),
        ]);

        // const decoded = iFace.decodeFunctionData('approve', data);
        // console.log('Decoded:', decoded);

        approveTxPayload = { to: wPol, data, value: '0x0' };
      }

      //   return data;
      const quotes = await fetchQuote({
        amount,
        fromToken: wPol,
        toToken: wEthBase,
        fromChain: 'polygon',
        toChain: 'base',
        slippageBps: 300,
        gasDrop: 0,
        referrerBps: 5,
      });

      return {
        approveTxPayload,
        swapQuote: quotes[0],
        mayanForwardContract: addresses.MAYAN_FORWARDER_CONTRACT,
      };
    } catch (error) {
      console.log(error);
    }
  }
}
