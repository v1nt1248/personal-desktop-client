/* tslint:disable:array-type */
/**
 * функция выполнения promises
 * @params promises {Promise<T>[]}
 * @return {Promise<{result: T, error: any}[]>}
 */
export async function waitAll <T>(promises: Promise<T>[]): Promise<{result: T|null, error: any}[]> {
  const results: {result: T|null, error: any}[] = [];

  for (const p of promises) {
    await p.then(res => {
        results.push({result: res, error: null});
      }, err => {
      results.push({result: null, error: err});
    });
  }
  return results;
}
