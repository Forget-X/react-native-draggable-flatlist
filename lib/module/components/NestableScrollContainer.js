function _extends() {
  _extends =
    Object.assign ||
    function (target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
  return _extends.apply(this, arguments);
}

import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedScrollHandler,
} from "react-native-reanimated";
import {
  NestableScrollContainerProvider,
  useSafeNestableScrollContainerContext,
} from "../context/nestableScrollContainerContext";
import { useStableCallback } from "../hooks/useStableCallback";
const AnimatedScrollView = Animated.createAnimatedComponent(ScrollView);

function NestableScrollContainerInner(props) {
  const {
    outerScrollOffset,
    containerSize,
    scrollViewSize,
    scrollableRef,
    outerScrollEnabled,
  } = useSafeNestableScrollContainerContext();
  const onScroll = useStableCallback((scrollOffset) => {
    var _props$onScrollOffset;

    (_props$onScrollOffset = props.onScrollOffsetChange) === null ||
    _props$onScrollOffset === void 0
      ? void 0
      : _props$onScrollOffset.call(props, scrollOffset);
  });
  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      outerScrollOffset.value = event.contentOffset.y;
      runOnJS(onScroll)(event.contentOffset.y);
    },
  });
  const onLayout = useStableCallback((event) => {
    const {
      nativeEvent: { layout },
    } = event;
    containerSize.value = layout.height;
  });
  const onContentSizeChange = useStableCallback((w, h) => {
    var _props$onContentSizeC;

    scrollViewSize.value = h;
    (_props$onContentSizeC = props.onContentSizeChange) === null ||
    _props$onContentSizeC === void 0
      ? void 0
      : _props$onContentSizeC.call(props, w, h);
  });
  return /*#__PURE__*/ React.createElement(
    AnimatedScrollView,
    _extends({}, props, {
      onLayout: onLayout,
      onContentSizeChange: onContentSizeChange,
      scrollEnabled: outerScrollEnabled,
      ref: scrollableRef,
      scrollEventThrottle: 1,
      onScroll: scrollHandler,
    })
  );
}

export const NestableScrollContainer = /*#__PURE__*/ React.forwardRef(
  (props, forwardedRef) => {
    return /*#__PURE__*/ React.createElement(
      NestableScrollContainerProvider,
      {
        forwardedRef: forwardedRef || undefined,
      },
      /*#__PURE__*/ React.createElement(NestableScrollContainerInner, props)
    );
  }
);
//# sourceMappingURL=NestableScrollContainer.js.map
