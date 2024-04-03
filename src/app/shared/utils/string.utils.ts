export class StringUtils {

  static pad(n: number, width = 2, z = '0'): string {
    z = z || '0';
    const num = n + '';
    return num.length >= width ? num : new Array(width - num.length + 1).join(z) + num;
  }

}
