import React, { useState } from 'react';
import './welcome.scss';
import btn_google from '../assets/imgs/btn_google.png';
import background from '../assets/imgs/background.png';
import poster from '../assets/imgs/poster.jpg';

function Welcome() {

    const [isHome, setIsHome] = useState(true);

    return (
        <div className="welcome-wrapper">
            <div className={`poster-img-wrapper${isHome ? "" : " hidden"}`}>
                <img className="poster-img" src={poster} onClick={() => setIsHome(false)} />
            </div>
            <div className={`intro${isHome ? " hidden" : ""}`}>
                <img className="background-img" src={background} />
                <div className="background-cover">
                    <div className="intro-msg">
                        <p>
                            전세계적 팬데믹은 많은 사람들을 불안과 혼란 속에 빠뜨렸습니다.
                            각 개인의 큰 노력과 희생에도 불구하고 우리나라 또한 이 난국을 완전히 피해가지는 못했습니다.
                            <br /><br />
                            '몸은 멀리, 별은 가까이'
                            이 불편한 시국을 헤쳐나가기 위해 서로를 멀리 떨어뜨린 우리 동아리원들은
                            언제나 하늘에서 빛나고 있는 별을 보며 다시 하나가 되었습니다.
                            그러한 활동은 사진으로 기록되어 남았습니다.
                            동아리원들의 1년간의 발자취에 당신을 초대합니다.
                            <br /><br />
                            - AAA 81대 회장 정현우
                        </p>

                    </div>
                    <div className="intro-wrapper">
                        <p>방명록, MVP 투표 등의 기능을 위해 google계정으로 로그인 하실 수 있습니다</p>
                        <a href="https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=291115756769-mr1ui2pknfsvj3hfjk7hihsgv5ldm1p6.apps.googleusercontent.com&scope=openid%20email&redirect_uri=http://localhost:3000/auth/google">
                            <button className="btn-google" type="button">
                                <img src={btn_google} />
                            </button>
                        </a>
                        <div className="intro-footer">

                            <p>개인정보 처리방침</p>
                        </div>

                    </div>
                    <p className="background-copyright">ⓒ 2020, 서울대학교 아마추어 천문회</p>
                </div>
            </div>
        </div>
    )
}

export default Welcome;
