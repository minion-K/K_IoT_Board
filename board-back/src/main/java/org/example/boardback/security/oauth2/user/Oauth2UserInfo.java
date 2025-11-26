package org.example.boardback.security.oauth2.user;

import lombok.RequiredArgsConstructor;

import java.util.Map;

/**
 * 각 OAuth2 provider(구글/카카오/네이버)의 사용자 정보를
 * 공통 포맷으로 추상화하는 클래스
 * */
public abstract class Oauth2UserInfo {
    protected final Map<String, Object> attributes;

    protected Oauth2UserInfo(Map<String, Object> attributes) {
        this.attributes = attributes;
    }

    /** provider가 주는 내부 attributes 전체 */
    public Map<String, Object> getAttributes() {
        return attributes;
    }

    // provider 별 고유 ID(sub, id)
    public abstract String getId();

    // 이메일
    public abstract String getEmail();

    // 이름, 닉네임
    public abstract String getName();

    // 프로필 이미지 URL (없으면 null)
    public abstract String getImageUrl();
}
