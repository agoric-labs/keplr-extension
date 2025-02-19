import { IMessageRenderer } from "../types";
import React, { FunctionComponent } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../../../stores";
import { Staking } from "@keplr-wallet/stores";
import { Bech32Address } from "@keplr-wallet/cosmos";
import { MsgBeginRedelegate } from "@keplr-wallet/proto-types/cosmos/staking/v1beta1/tx";
import { Coin } from "@keplr-wallet/types";
import { CoinPretty } from "@keplr-wallet/unit";
import { Image } from "../../../../../components/image";

export const RedelegateMessage: IMessageRenderer = {
  process(chainId: string, msg) {
    const d = (() => {
      if ("type" in msg && msg.type === "cosmos-sdk/MsgBeginRedelegate") {
        return {
          validatorSrcAddress: msg.value.validator_src_address,
          validatorDstAddress: msg.value.validator_dst_address,
          amount: msg.value.amount,
        };
      }

      if (
        "unpacked" in msg &&
        msg.typeUrl === "/cosmos.staking.v1beta1.MsgBeginRedelegate"
      ) {
        return {
          validatorSrcAddress: (msg.unpacked as MsgBeginRedelegate)
            .validatorSrcAddress,
          validatorDstAddress: (msg.unpacked as MsgBeginRedelegate)
            .validatorDstAddress,
          amount: (msg.unpacked as MsgBeginRedelegate).amount,
        };
      }
    })();

    if (d) {
      return {
        icon: (
          <Image
            alt="sign-redelegate-image"
            src={require("../../../../../public/assets/img/sign-delegate.png")}
            style={{ width: "3rem", height: "3rem" }}
          />
        ),
        title: "Redelegate",
        content: (
          <RedelegateMessagePretty
            chainId={chainId}
            validatorSrcAddress={d.validatorSrcAddress}
            validatorDstAddress={d.validatorDstAddress}
            amount={d.amount}
          />
        ),
      };
    }
  },
};

const RedelegateMessagePretty: FunctionComponent<{
  chainId: string;
  validatorSrcAddress: string;
  validatorDstAddress: string;
  amount: Coin;
}> = observer(
  ({ chainId, validatorSrcAddress, validatorDstAddress, amount }) => {
    const { chainStore, queriesStore } = useStore();

    const currency = chainStore
      .getChain(chainId)
      .forceFindCurrency(amount.denom);
    const coinPretty = new CoinPretty(currency, amount.amount);

    const srcMoniker = queriesStore
      .get(chainId)
      .cosmos.queryValidators.getQueryStatus(Staking.BondStatus.Bonded)
      .getValidator(validatorSrcAddress)?.description.moniker;

    const sdstMoniker = queriesStore
      .get(chainId)
      .cosmos.queryValidators.getQueryStatus(Staking.BondStatus.Bonded)
      .getValidator(validatorDstAddress)?.description.moniker;

    return (
      <React.Fragment>
        Redelegate <b>{coinPretty.trim(true).toString()}</b> from{" "}
        <b>
          {srcMoniker || Bech32Address.shortenAddress(validatorSrcAddress, 28)}
        </b>{" "}
        to{" "}
        <b>
          {sdstMoniker || Bech32Address.shortenAddress(validatorDstAddress, 28)}
        </b>
      </React.Fragment>
    );
  }
);
