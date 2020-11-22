import React from 'react';
import './popup.scss';

type ToolTopProps = {
    close: () => void;
}

function ToolTop({ close }: ToolTopProps) {

    return (
        <div className="popup-wrp">
            <div className="popup">
                <button className="popup-btn-close" onClick={close}>
                    <i className="ri-close-line"></i>
                </button>
                <h3>Tool Tip</h3>
                <div className="tooltip-body">
                    <p>
                        <i className="ri-computer-line"></i><br />
                        화살표 방향키 혹은 W A S D 키를 사용해서 움직이세요.
                    </p>
                    <p>
                        <i className="ri-smartphone-line"></i><br />
                        하단의 방향키 버튼을 사용해서 움직이세요.
                        </p>
                    <p>
                        사진에 가까이 가신 후 사진을 클릭하시면 상세 설명을 보실 수 있습니다.<br /><br />
                        관람이 끝나신 후 화면 우측 상단의 버튼을 클릭하시어 방명록 작성 및 MVP 투표를 해주시면 감사하겠습니다.
                    </p>
                </div>
            </div>
        </div >
    )
}

export default ToolTop;
