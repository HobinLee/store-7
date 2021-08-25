import MRating from "@material-ui/lab/Rating";
import { withStyles } from "@material-ui/core/styles";
import { theme } from "@/styles/theme";

const PRECISION = 0.5;

export type RatingProps = {
  value?: number;
  size?: "small" | "medium" | "large";
  className?: string;
  readOnly?: boolean;
  rate?: React.MutableRefObject<string>;
  color?: string;
};

const Rating = ({
  value = 0,
  size = "large",
  className,
  readOnly = false,
  rate,
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
        defaultValue={value}
        precision={PRECISION}
        readOnly={readOnly}
        size={size}
        className="MuiRating-sizeLarge"
        onChange={(e, newValue) => (rate.current = String(newValue))}
      />
    </span>
  );
};

export default Rating;
