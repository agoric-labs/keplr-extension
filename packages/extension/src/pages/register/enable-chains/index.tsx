import React, { FunctionComponent, useMemo, useState } from "react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../../stores";
import { RegisterSceneBox } from "../components/register-scene-box";
import { Stack } from "../../../components/stack";
import { useRegisterHeader } from "../components/header";
import { useSceneEvents } from "../../../components/transition";
import { ChainInfo } from "@keplr-wallet/types";
import { CoinPretty } from "@keplr-wallet/unit";
import { Box } from "../../../components/box";
import { Column, Columns } from "../../../components/column";
import { XAxis, YAxis } from "../../../components/axis";
import { Gutter } from "../../../components/gutter";
import { TextInput } from "../../../components/input";
import { Subtitle3 } from "../../../components/typography";
import { Button } from "../../../components/button";

export const EnableChainsScene: FunctionComponent = observer(() => {
  const { chainStore, accountStore, queriesStore } = useStore();

  const header = useRegisterHeader();
  useSceneEvents({
    onWillVisible: () => {
      header.setHeader({
        mode: "step",
        title: "Select Chains",
        stepCurrent: 3,
        stepTotal: 6,
      });
    },
  });

  const [search, setSearch] = useState<string>("");

  const chainInfos = useMemo(() => {
    if (!search) {
      return chainStore.chainInfos;
    } else {
      return chainStore.chainInfos.filter((chainInfo) => {
        return (
          chainInfo.chainName.toLowerCase().includes(search.toLowerCase()) ||
          chainInfo.stakeCurrency.coinDenom
            .toLowerCase()
            .includes(search.toLowerCase())
        );
      });
    }
  }, [chainStore.chainInfos, search]);

  return (
    <RegisterSceneBox>
      <TextInput
        placeholder="Search networks"
        value={search}
        onChange={(e) => {
          e.preventDefault();

          setSearch(e.target.value);
        }}
      />
      <Gutter size="0.75rem" />
      <Subtitle3
        style={{
          textAlign: "center",
        }}
      >
        3 chain(s) selected
      </Subtitle3>
      <Gutter size="0.75rem" />
      <Box
        height="25.5rem"
        style={{
          overflowY: "scroll",
        }}
      >
        <Stack gutter="0.5rem">
          {chainInfos.map((chainInfo) => {
            const account = accountStore.getAccount(chainInfo.chainId);
            if (!account.bech32Address) {
              return null;
            }

            const queries = queriesStore.get(chainInfo.chainId);

            const balance = queries.queryBalances.getQueryBech32Address(
              account.bech32Address
            ).stakable.balance;

            return (
              <ChainItem
                key={chainInfo.chainId}
                chainInfo={chainInfo}
                balance={balance}
              />
            );
          })}
        </Stack>
      </Box>

      <Gutter size="1.25rem" />
      <Box width="22.5rem" marginX="auto">
        <Button text="Import" size="large" />
      </Box>
    </RegisterSceneBox>
  );
});

const ChainItem: FunctionComponent<{
  chainInfo: ChainInfo;
  balance: CoinPretty;
}> = ({ chainInfo, balance }) => {
  return (
    <Box borderRadius="0.375rem" paddingX="1rem" paddingY="0.75rem">
      <Columns sum={1}>
        <XAxis alignY="center">
          <div>TODO: Chain Icon</div>
          <YAxis>
            <div>{chainInfo.chainName}</div>
            <Gutter size="0.25rem" />
            <div>{balance.currency.coinDenom}</div>
          </YAxis>
        </XAxis>
        <Column weight={1} />
        <XAxis alignY="center">
          <YAxis>
            <div>{balance.maxDecimals(6).shrink(true).toString()}</div>
            <Gutter size="0.25rem" />
            <div>ㅅㅂ</div>
          </YAxis>
        </XAxis>
      </Columns>
    </Box>
  );
};
