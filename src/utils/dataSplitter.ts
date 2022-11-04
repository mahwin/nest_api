import { VocaDto } from '../vocas/dto/vocas-voca.dto';

export default function dataSplitter(data: VocaDto[]) {
  const maxLevel = Number(data[data.length - 1].level);
  const newArr = Array.from({ length: maxLevel }, () => []);
  data.forEach((item) => {
    let level = +item.level;
    newArr[level - 1].push({
      word: item.word,
      mean: item.mean,
      frequency: item.frequency,
    });
  });
  return newArr;
}
