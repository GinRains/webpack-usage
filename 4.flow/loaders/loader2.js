function loader2(input) {
  // return input + '//loader2'
  return `module.exports = "${input}//loader2"`
}

module.exports = loader2