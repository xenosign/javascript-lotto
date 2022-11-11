const MissionUtils = require("@woowacourse/mission-utils");
const Lotto = require("./Lotto");
class App {
  constructor() {
    this.money = 0;
    this.counts = 0;
    this.lottoNumbers = [];
    this.bonus = 0;
    this.userLottoNumbers = [];
  }

  getUserInput() {
    MissionUtils.Console.readLine("로또 구입 금액을 입력하세요 : ", (userInput) => {
      const inputNumber = parseInt(userInput);

      if (inputNumber % 1000 !== 0) {
        throw new Error("[ERROR] 구입 금액은 1,000원 단위로 입력해 주세요");
      }

      if (inputNumber === 0) {
        throw new Error("[ERROR] 구입 금액은 1,000원 이상으로 입력해 주세요");
      }
      this.money = userInput;
      this.counts = this.money / 1000;
      this.getLottoInput();
    });
  }

  getLottoInput() {
    MissionUtils.Console.readLine("로또 당첨 번호를 입력하세요(',' 쉼표로 구분) : ", (userInput) => {
      const userLottoArr = userInput.split(",").map(Number);

      if (new Set(userLottoArr).size !== 6) {
        throw new Error("[ERROR] 중복 된 숫자를 입력 하셨거나, 숫자 6개를 입력 하시지 않으셨습니다")
      }

      if (userLottoArr.filter(el => el >= 1 && el <= 45).length !== 6) {
        throw new Error("[ERROR] 1 ~ 45 사이의 숫자를 입력하세요");
      }

      this.userLottoNumbers = userLottoArr;

      this.getBonusInput();
    });
  }

  getBonusInput() {
    MissionUtils.Console.readLine("보너스 번호를 입력하세요 : ", (userInput) => {
      const userLottoBonus = parseInt(userInput);

      if (userLottoBonus <= 0 || userLottoBonus > 45) {
        throw new Error("[ERROR] 1 ~ 45 사이의 숫자를 입력하세요");
      } else if (this.userLottoNumbers.find(el => el === userLottoBonus)) {
        throw new Error("[ERROR] 기존 입력 번호와 다른 보너스 번호를 입력하세요");
      }

      this.bonus = userLottoBonus;

      this.checkLotto();
    });
  }

  checkLotto() {
    MissionUtils.Console.print(`${this.counts}개를 구매했습니다.`)

    new Lotto(this.userLottoNumbers);
  }


  play() {
    this.getUserInput();
  }
}

const app = new App();
app.play();


module.exports = App;
