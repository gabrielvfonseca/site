
// This file is a utility function that 
// returns a formatted date string.

export function formatDate(input: string): string {
  const date = new Date(input)
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
};

export function howLongAgo(input: string): string {
  const date = new Date(input)
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const diffInDays = diff / (1000 * 60 * 60 * 24)
  if (diffInDays < 1) {
    return "today"
  } else if (diffInDays < 2) {
    return "yesterday"
  } else if (diffInDays < 7) {
    return `${Math.floor(diffInDays)} days ago`
  } else if (diffInDays < 14) {
    return "last week"
  } else if (diffInDays < 30) {
    return `${Math.floor(diffInDays / 7)} weeks ago`
  } else if (diffInDays < 60) {
    return "last month"
  } else if (diffInDays < 365) {
    return `${Math.floor(diffInDays / 30)} months ago`
  } else if (diffInDays < 730) {
    return "last year"
  } else {
    return `${Math.floor(diffInDays / 365)} years ago`
  }
}

