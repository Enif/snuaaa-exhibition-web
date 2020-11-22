import React from 'react';

type PrivacyPolicyProps = {
    close: () => void;
}

function PrivacyPolicy({ close }: PrivacyPolicyProps) {

    return (
        <div className="privacy-wrp">
            <button className="privacy-btn-close" onClick={close}>
                <i className="ri-close-line"></i>
            </button>
            <p>서울대학교 아마추어 천문회 AAA는 아래의 목적으로 개인정보를 수집 및 이용하며,
                개인 정보를 안전하게 취급하는데 최선을 다합니다.
                <br />
                <br />
                개인정보 수집 이용 동의 안내
                <br />
                <br />
                * 수집 및 이용 목적: 이벤트 참여자 경품 발송<br/>
                * 수집하는 정보: 구글 이메일<br/>
                * 개인정보 보유 및 이용 기간: ~2020.12.31 (이벤트 종료 후 즉시 파기)
                </p>
        </div>
    )
}

export default PrivacyPolicy;
