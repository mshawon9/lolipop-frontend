import * as Yup from "yup";

export const dateValidationSchema = Yup.object().shape({
    fromDate: Yup.date()
        .nullable()
        .test("is-before", "From Date must be before To Date", function (fromDate) {
            const { toDate } = this.parent;
            return !fromDate || !toDate || fromDate <= toDate;
        }),
    toDate: Yup.date().nullable(),
});
