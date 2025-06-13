import "styled-components";

//color stystem
declare module "styled-components" {
  export interface DefaultTheme {
    backgroundPrimary: string;
    backgroundOverlay: string; // 반투명 어두운 레이어
    bacgroundCard: string; // 카드 배경색
    iconColor: string;

    textOnPrimary: string;
    textOnAccent: string;
    textOnOverlay: string; // 반투명 검정 위에 쓰는 텍스트
    textOnCard: string; // 카드 위에 쓰는 텍스트
  }
}
