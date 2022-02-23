type GetHoursFromMilliseconds = (milliseconds: number) => number

const getHoursFromMilliseconds: GetHoursFromMilliseconds = milliseconds => milliseconds / 1000 / 60 / 60

export default getHoursFromMilliseconds