import React from 'react';
import './welcome.scss';
import btn_google from '../assets/imgs/btn_google.png';
import background from '../assets/imgs/background.jpg';

function Welcome() {

    return (
        <div className="welcome-wrapper">
            <img className="background-img" src={background} />
            <div className="background-cover">
                <div className="intro-wrapper">
                    <p>안녕하세요.<br />
                        서울대학교 아마추어 천문회 제38회 천체사진전<br />
                        <em>"몸은 멀리 별은 가까이"</em>에 오신 것을 환영합니다.<br />
                        이벤트 추첨 및 방명록 등의 관리를 위해 구글 계정으로 입장 가능한 점 양해 부탁드립니다.<br />
                        멘트내용 고민하기 고민하기
                    </p>
                    <p>구글 계정으로 입장하기</p>
                    <a href="https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=291115756769-mr1ui2pknfsvj3hfjk7hihsgv5ldm1p6.apps.googleusercontent.com&scope=openid%20email&redirect_uri=http://localhost:3000/auth/google">
                        <button className="btn-google" type="button">
                            <img src={btn_google} />
                        </button>
                    </a>
                    <div className="intro-footer">

                        <p>개인정보 처리방침</p>
                        <p>ⓒ 2020, 서울대학교 아마추어 천문회</p>
                    </div>

                </div>
                <p className="background-copyright">15정만근 作</p>
            </div>
        </div>
    )
}

export default Welcome;
