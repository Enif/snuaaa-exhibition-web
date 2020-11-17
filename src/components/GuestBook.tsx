import React, { useEffect, useState } from 'react';
import GuestBookService from '../services/GuestBookService';
import './guestBook.scss';
import GuestBookType from '../types/GuestBookType';
import useAuth from '../hooks/useAuth';
import NicknameInput from './NicknameInput';

type GuestBookProps = {
    close: () => void;
}
function GuestBook({ close }: GuestBookProps) {

    const [guestBooks, setGuestBooks] = useState<GuestBookType[]>([]);
    const [inputText, setInputText] = useState<string>("");
    const { auth } = useAuth();

    useEffect(() => {
        fetch();
    }, [])


    const fetch = function () {
        GuestBookService.retrieveAll()
            .then((guestbooks) => {
                setGuestBooks(guestbooks.data)
            })
            .catch((err) => {
                console.error(err)
            })
    }

    const submit = function (text: string) {
        GuestBookService.create({ text })
            .then((res) => {
                setInputText("")
                fetch();
            })
            .catch((err) => {
                console.error(err)
            })
    }

    const makeGuestBookList = function (guestbooks: GuestBookType[]) {
        return guestbooks.map((guestbook) => {
            return (
                <div className="guestbook-list-unit">
                    {guestbook.text}
                    {/* {guestbook.author_id} */}
                    <p>{guestbook.author.nickname}</p>
                    <p>{guestbook.created_at}</p>
                </div>
            )
        })
    }

    return (
        <>
            <div className="guestbook-wrp">
                <div className="guestbook">
                    <button className="guestbook-btn-close" onClick={close}>
                        <i className="ri-close-line"></i>
                    </button>
                    <h3>방 명 록</h3>
                    {
                        auth.nickname ?
                            <div className="guestbook-body">
                                <div className="guestbook-list">
                                    {makeGuestBookList(guestBooks)}
                                </div>
                                <div className="guestbook-write">
                                    <textarea onChange={(e) => setInputText(e.target.value)} value={inputText} />
                                    <button onClick={() => submit(inputText)}>enter</button>
                                </div>
                            </div>
                            :
                            <NicknameInput />
                    }
                </div>

            </div>
        </>
    )
}

export default GuestBook;
