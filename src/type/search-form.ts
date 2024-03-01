import { z } from "zod";

const formSchema = z.object({
  country: z.string().min(1, { message: "You should select one place!" }),
  dates: z.object(
    {
      startDate: z.string().min(1, { message: "You should select one date!" }),
      endDate: z.string().min(1, { message: "You should select one date!" }),
    },
    { required_error: "You should select two dates!" }
  ),
});

type formType = z.infer<typeof formSchema>;

type FormProps = {
  onHandleSubmit: (value: formType) => void;
};

export { formSchema };
export type { formType, FormProps };
