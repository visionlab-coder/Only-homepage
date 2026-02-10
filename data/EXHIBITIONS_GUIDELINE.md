# 박람회 데이터 관리 지침

## 새로운 박람회 추가 시 필수 작업

모든 박람회 항목에는 **`detailedInfo` 필드를 반드시 포함**해야 합니다.

### 필수 구조

```typescript
{
    id: 'unique-id',
    name: '박람회 이름',
    category: '카테고리',
    location: '개최지',
    country: '국가',
    startDate: 'YYYY-MM-DD',
    endDate: 'YYYY-MM-DD',
    description: '간단한 설명',
    website: 'https://...',
    
    // 필수: 상세 정보
    detailedInfo: {
        exhibitionDetails: '박람회에 대한 자세한 한글 설명 (2-3문장)',
        keyHighlights: [
            '주요 특징 1',
            '주요 특징 2',
            '주요 특징 3',
            '주요 특징 4'
        ],
        targetAudience: '대상 관람객 설명',
        expectedVisitors: '예상 방문객 수 (선택)',
        exhibitorCount: '출품업체 수 (선택)'
    },
    
    // 추천 박람회의 경우
    isRecommended: true,
    priority: 1,  // 우선순위 번호
    season: 'H1'  // 'H1' (상반기) 또는 'H2' (하반기)
}
```

### detailedInfo 작성 가이드

1. **exhibitionDetails**
   - 박람회의 성격, 규모, 주요 전시 내용을 2-3문장으로 설명
   - 건설 산업과의 관련성을 명확히 서술
   - 한글로 작성하여 사용자가 웹사이트 방문 없이 이해할 수 있도록 함

2. **keyHighlights**
   - 4개의 핵심 특징을 간결하게 나열
   - 기술적 특징, 실용적 장점, 차별화 포인트 포함
   - 각 항목은 한 줄로 간결하게

3. **targetAudience**
   - 추천 대상을 명확히 명시
   - 직무 또는 부서 기준으로 작성

4. **expectedVisitors & exhibitorCount**
   - 가능한 경우 포함하여 박람회 규모 가시화
   - 정확한 숫자가 없으면 생략 가능

### 주의사항

❌ **절대 하면 안 되는 것:**
- detailedInfo 필드를 생략하면 "더보기" 버튼이 표시되지 않음
- KOTRA 등 외부 기관 주선 관련 내용은 포함하지 말 것
- 영문 그대로 번역 없이 사용하지 말 것

✅ **반드시 지켜야 할 것:**
- 모든 새 박람회는 detailedInfo 포함
- 한글로 상세하고 명확하게 작성
- 건설 산업 관점에서 유용한 정보 제공

## 예시

```typescript
{
    id: 'example-expo-2026',
    name: '예시 박람회 2026',
    category: '스마트건설',
    location: '서울',
    country: '한국',
    startDate: '2026-03-01',
    endDate: '2026-03-03',
    description: '한국 최대 건설 기술 박람회',
    website: 'https://example.com',
    detailedInfo: {
        exhibitionDetails: '국내 최대 규모의 건설 기술 전문 박람회입니다. 스마트 건설 장비, AI 안전 관리 시스템, BIM 솔루션 등이 집중 전시됩니다.',
        keyHighlights: [
            '국내 주요 건설사 참여',
            'AI 기반 안전 관리 시스템 집중 전시',
            'BIM 및 디지털 트윈 솔루션',
            '실시간 데모 및 기술 세미나'
        ],
        targetAudience: '건설사 기술팀, 스마트건설 담당자, 안전관리팀',
        expectedVisitors: '5만명+',
        exhibitorCount: '300개사'
    }
}
```

이 지침을 따라 모든 박람회 데이터를 관리하십시오.
