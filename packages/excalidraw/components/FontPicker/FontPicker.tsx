import React, { useCallback, useMemo } from "react";
import * as Popover from "@radix-ui/react-popover";

import { FontPickerList } from "./FontPickerList";
import { FontPickerTrigger } from "./FontPickerTrigger";
import { ButtonIconSelect } from "../ButtonIconSelect";
import {
  FontFamilyCodeIcon,
  FontFamilyNormalIcon,
  FreedrawIcon,
} from "../icons";
import { ButtonSeparator } from "../ButtonSeparator";
import type { FontFamilyValues } from "../../element/types";
import { FONT_FAMILY } from "../../constants";
import { t } from "../../i18n";

import "./FontPicker.scss";

export const DEFAULT_FONTS = [
  {
    value: FONT_FAMILY.Excalifont,
    icon: FreedrawIcon,
    text: t("labels.handDrawn"),
    testId: "font-family-handrawn",
  },
  {
    value: FONT_FAMILY["Liberation Sans"],
    icon: FontFamilyNormalIcon,
    text: t("labels.normal"),
    testId: "font-family-normal",
  },
  {
    value: FONT_FAMILY.Cascadia,
    icon: FontFamilyCodeIcon,
    text: t("labels.code"),
    testId: "font-family-code",
  },
];

export const isCustomFont = (fontFamily: number | null) => {
  return !DEFAULT_FONTS.find((x) => x.value === fontFamily);
};

interface FontPickerProps {
  isOpened: boolean;
  selectedFontFamily: FontFamilyValues | null;
  hoveredFontFamily: FontFamilyValues | null;
  onSelect: (fontFamily: FontFamilyValues) => void;
  onHover: (fontFamily: FontFamilyValues) => void;
  onLeave: () => void;
  onPopupChange: (open: boolean) => void;
}

export const FontPicker = React.memo(
  ({
    isOpened,
    selectedFontFamily,
    hoveredFontFamily,
    onSelect,
    onHover,
    onLeave,
    onPopupChange,
  }: FontPickerProps) => {
    const defaultFonts = useMemo(() => DEFAULT_FONTS, []);
    const onSelectCallback = useCallback(
      (value: number | false) => {
        if (value) {
          onSelect(value);
        }
      },
      [onSelect],
    );

    return (
      <div role="dialog" aria-modal="true" className="FontPicker__container">
        <ButtonIconSelect<FontFamilyValues | false>
          type="button"
          options={defaultFonts}
          value={selectedFontFamily}
          onClick={onSelectCallback}
        />
        <ButtonSeparator />
        <Popover.Root open={isOpened} onOpenChange={onPopupChange}>
          <FontPickerTrigger selectedFontFamily={selectedFontFamily} />
          {isOpened && (
            <FontPickerList
              selectedFontFamily={selectedFontFamily}
              hoveredFontFamily={hoveredFontFamily}
              onSelect={onSelectCallback}
              onHover={onHover}
              onLeave={onLeave}
              onOpen={() => onPopupChange(true)}
              onClose={() => onPopupChange(false)}
            />
          )}
        </Popover.Root>
      </div>
    );
  },
  (prev, next) =>
    prev.isOpened === next.isOpened &&
    prev.selectedFontFamily === next.selectedFontFamily &&
    prev.hoveredFontFamily === next.hoveredFontFamily,
);