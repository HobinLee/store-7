import MRating from "@material-ui/lab/Rating";
import { withStyles } from "@material-ui/core/styles";
import { theme } from "@/styles/theme";

export type RatingProps = {
  value?: number;
  size?: "small" | "medium" | "large";
  className?: string;
  readOnly?: boolean;
};

const Rating = ({
  value = 0,
  size = "large",
  className,
  readOnly = false,
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
        precision={0.1}
        readOnly={readOnly}
        size={size}
        name="rating"
      />
    </div>
  );
};

export default Rating;
