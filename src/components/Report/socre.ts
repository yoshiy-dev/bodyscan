export const getText = (score: number): string => {
  if (score >= 80) {
    return '骨格のバランスが最高やで！そのままでええで！日頃から適度な運動やストレッチを心がけて、骨格のバランスを維持し続けてええねん。そうしたら、将来的にも健康で快適な生活が送れるで!';
  } else if (score >= 60) {
    return '骨格のバランスは悪くないんやけど、もっと良くできるんちゃうかな？適度な運動やストレッチを心がけようや！骨格のバランスを整えることで、姿勢が良くなり、肩こりや腰痛などの痛みが改善されるで。また、運動能力やバランス感覚も向上するで!';
  } else if (score >= 40) {
    return '骨格のバランスに若干の偏りがあるんやけど、痛みや違和感はないか？接骨院で施術を受けてバランスを整えようや！骨格のバランスを整えることで、痛みや違和感を軽減できるで。また、骨粗鬆症や変形性関節症などの病気のリスクも軽減できるで!';
  } else if (score >= 20) {
    return '骨格のバランスが悪く、痛みや違和感があるんやったら、早めに接骨院で施術を受けようや！骨格のバランスを整えることで、痛みや違和感を解消できるで。また、骨粗鬆症や変形性関節症などの病気のリスクも軽減できるで!';
  } else {
    return '計測エラー';
  }
};

export const getRankAndColor = (score: number): { rank: string; textColor: string } => {
  let rank: string;
  let textColor: string;

  if (score >= 80) {
    rank = 'A';
    textColor = 'text-red-500';
  } else if (score >= 60) {
    rank = 'B';
    textColor = 'text-blue-500';
  } else if (score >= 50) {
    rank = 'C';
    textColor = 'text-orange-500';
  } else if (score >= 40) {
    rank = 'D';
    textColor = 'text-yellow-500';
  } else {
    rank = '測定不能';
    textColor = 'text-red-500';
  }

  return { rank, textColor };
};
