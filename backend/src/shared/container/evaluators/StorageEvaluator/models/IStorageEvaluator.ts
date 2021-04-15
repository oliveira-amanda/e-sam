export default interface IStorageEvaluator {
  saveFile(file: string): Promise<string>;
  deleteFile(file: string): Promise<void>;
}