import MRating from "@material-ui/lab/Rating";
import { withStyles } from "@material-ui/core/styles";
import { theme } from "@/styles/theme";

export type RatingProps = {
  value?: number;
  size?: "small" | "medium" | "large";
  className?: string;
  readOnly?: boolean;
  rate?: React.MutableRefObject<string>;
};

const Rating = ({
  value = 0,
  size = "large",
  className,
  readOnly = false,
  rate,
}: RatingProps) => {
  const CustomRating = withStyles({
    iconFilled: {
      color: theme.color.primary1,
    },
  })(MRating);

  return (
    <div {...{ className }}>
      <CustomRating
        role={!readOnly ? "button" : "article"}
        defaultValue={value}
        precision={0.5}
        readOnly={readOnly}
        size={size}
        name="rating"
        onChange={(e, newValue) => (rate.current = String(newValue))}
      />
    </div>
  );
};

export default Rating;
