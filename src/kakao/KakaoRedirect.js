import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function KakaoRedirectPage() {
    const navigate = useNavigate();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");
        const userId = params.get("userId");
        const name = params.get("name");

        console.log("kakaoRedirect 로그인 정보");
        console.log("token:", token);
        console.log("userId:", userId);
        console.log("name", name);
        if (token && userId) {
            localStorage.setItem("token", token);
            localStorage.setItem("userId", userId);
            localStorage.setItem("name", name);
            console.log("로그인성공");

            // 시간 차 두고 이동(localstorage에 저장하기 위한 시간 필요)
            setTimeout(() => {
                navigate("/interview/stage1");
            }, 100); 
        } else {
            alert("로그인 실패");
            navigate("/home");
        }
    }, [navigate]);

    return <div>로그인 처리 중입니다...</div>;
}

export default KakaoRedirectPage;
