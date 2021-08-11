import React from "react";
import Rating from "@material-ui/lab/Rating";
import { withStyles } from "@material-ui/core/styles";
import { light } from "@/styles/theme";

export enum RATING_KIND {
  BOOKING = "BOOKING",
  ORDER = "ORDER",
}

export interface ETRatingProps {
  value: number;
  size?: "small" | "medium" | "large";
  className?: string;
}

const ETRating = ({ value = 0, size = "large", className }: ETRatingProps) => {
  const CustomRating = withStyles({
    iconFilled: {
      color: light.color.primary1,
    },
  })(Rating);

  return (
    <div {...{ className }}>
      <CustomRating defaultValue={value} precision={0.1} readOnly size={size} />
    </div>
  );
};

export default ETRating;
