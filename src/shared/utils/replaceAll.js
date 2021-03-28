export default function replaceAll(text = '') {
   return text
      .replace('\n', '')
      .replace('\n\t', '')
      .replace('\t', '')
      .replace('&nbsp;', '')
      .trim();
}
