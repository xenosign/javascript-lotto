const MissionUtils = require("@woowacourse/mission-utils");
class Lotto {
  #numbers;

  constructor(numbers, bonus, counts) {
    this.validate(numbers);
    this.#numbers = numbers;
    this.counts = counts;
    this.bonus = bonus;
  }

  validate(numbers) {
    if (numbers.length !== 6) {
      throw new Error("[ERROR] 로또 번호는 6개여야 합니다.");
    }
  }

  playLotto() {
    this.makeLottoNumbers();
  }

  makeLottoNumbers() {
    const lottoNumbers = [];
    for (let i = 0; i < this.counts; i++) {
      const lotto = MissionUtils.Random.pickUniqueNumbersInRange(1, 45, 6);
      lotto.sort((a, b) => a - b);
      lottoNumbers.push(lotto);
    }

    this.checkLotto(lottoNumbers);
  }

  checkLotto(lottoNumbers) {
    const resultArr = [];

    for (let i = 0; i < lottoNumbers.length; i++) {
      let interSection = this.#numbers.filter((x) =>
        lottoNumbers[i].includes(x)
      );
      resultArr.push(interSection.length);
    }

    const isBonus = resultArr.findIndex((el) => el === this.bonus);

    let bonusIndex = -1;
    if (isBonus !== -1) {
      bonusIndex = lottoNumbers[isBonus].findIndex((el) => el === this.bonus);
    }

    if (bonusIndex) {
      resultArr.push(1);
    }

    this.showResult(resultArr);
  }

  showResult(resultArr) {
    const showArr = [];
    for (let i = 3; i <= 6; i++) {
      showArr.push(resultArr.filter((x) => x === i).length);
    }

    showArr.map((el, index) => {
      if (index === 0) {
        MissionUtils.Console.print(`${index + 3}개 일치 (5,000)원 - ${el}개`);
      }

      if (index === 1) {
        MissionUtils.Console.print(`${index + 3}개 일치 (50,000)원 - ${el}개`);
      }

      if (index === 2) {
        MissionUtils.Console.print(
          `${index + 3}개 일치 (1,500,000)원 - ${el}개`
        );
      }

      if (index === 3) {
        MissionUtils.Console.print(
          `${index + 3}개 일치 (2,000,000,000)원 - ${el}개`
        );
      }
    });
  }
}

module.exports = Lotto;
