const MissionUtils = require("@woowacourse/mission-utils");
class Lotto {
  #numbers;

  constructor(numbers) {
    this.validate(numbers);
    this.#numbers = numbers;
    this.counts = 0;
  }

  validate(numbers) {
    if (numbers.length !== 6) {
      throw new Error("[ERROR] 로또 번호는 6개여야 합니다.");
    }
    this.makeLottoNumbers(numbers.length, numbers);
  }

  makeLottoNumbers(counts, numbers) {
    const lottoNumbers = [];
    this.counts = counts;
    for (let i = 0; i < counts; i++) {
      const lotto = MissionUtils.Random.pickUniqueNumbersInRange(1, 45, 6);
      lotto.sort((a, b) => a - b);
      lottoNumbers.push(lotto);
    }

    this.checkLotto(lottoNumbers, numbers);
  }

  checkLotto(lottoNumbers, numbers) {
    const resultArr = [];
    for (let i = 0; i < lottoNumbers.length; i++) {
      let interSection = numbers.filter(x => lottoNumbers[i].includes(x));
      resultArr.push(interSection.length);
    }

    const isBonus = resultArr.findIndex(el => el === 5);
    this.showResult(resultArr, numbers);
  }

  showResult(resultArr, numbers) {
    const showArr = [];
    for (let i = 3; i <= 6; i++) {
      showArr.push(resultArr.filter(x => x === i).length);
    }

    showArr.map((el, index) => {
      if (index === 0) {
        MissionUtils.Console.print(`${index + 3}개 일치 (5,000)원 - ${el}개`);
      }

      if (index === 1) {
        MissionUtils.Console.print(`${index + 3}개 일치 (50,000)원 - ${el}개`);
      }

      if (index === 2) {
        MissionUtils.Console.print(`${index + 3}개 일치 (1,500,000)원 - ${el}개`);
      }

      if (index === 3) {
        MissionUtils.Console.print(`${index + 3}개 일치 (2,000,000,000)원 - ${el}개`);
      }

    })

  }



}

module.exports = Lotto;
