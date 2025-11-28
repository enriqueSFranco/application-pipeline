export interface DateProvider {
  formatDate: (date: Date, format: string) => string
  parseDate: (dateString: string, format: string) => Date
}
