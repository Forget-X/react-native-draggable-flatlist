import React from "react";
import { ScrollViewProps } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
export declare const NestableScrollContainer: React.ForwardRefExoticComponent<
  {
    onScrollOffsetChange?: ((scrollOffset: number) => void) | undefined;
  } & ScrollViewProps &
    React.RefAttributes<ScrollView>
>;
