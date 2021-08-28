import MRating from "@material-ui/lab/Rating";
import { withStyles } from "@material-ui/core/styles";
import { theme } from "@/styles/theme";

const PRECISION = 0.5;

export type RatingProps = {
  value?: number;
  size?: "small" | "medium" | "large";
  className?: string;
  readOnly?: boolean;
  rate?: string;
  setRate?: (string) => void;
  color?: string;
};

const Rating = ({
  value = 0,
  size = "large",
  className,
  readOnly = false,
  rate,
  setRate,
  color,
}: RatingProps) => {
  const CustomRating = withStyles({
    iconFilled: {
      color: color || theme.color.primary1,
    },
    iconEmpty: {
      color: color || theme.color.primary1,
      opacity: 0.3,
    },
  })(MRating);

  return (
    <span {...{ className }}>
      <CustomRating
        name="size-large"
        role={!readOnly ? "button" : "article"}
        defaultValue={rate ? +rate : value}
        precision={PRECISION}
        readOnly={readOnly}
        size={size}
        className="MuiRating-sizeLarge"
        onChange={(e, newValue) => {
          setRate(String(newValue));
        }}
      />
    </span>
  );
};

export default Rating;
