import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const TopContainer = styled.div`
    width: 100vw;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    size: 30px;
    background-color: black;
`;

const MainContainer = styled.div`
    width: 480px;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: white;
    position: relative;
    box-sizing: border-box;
    @media (max-width: 480px) {
        width: 100vw;
    }
`;

const HeaderContainer = styled.div`
    width: 100%;
    background-color: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    box-sizing: border-box;
`;

const CloseIcon = styled.img`
    width: 16px;
    height: 16px;
    cursor: pointer;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 20px;
    @media (max-width: 480px) {
        width: 16px;
        height: 16px;
    }
`;

const PageTitle = styled.span`
    font-size: 1.1rem;
    color: #434343;
    margin-top: 10px;
    margin-bottom: 10px;
    margin-left: auto;
    margin-right: auto;
    @media (max-width: 480px) {
        font-size: 1rem;
    }
`;

const MemeTitle = styled.input`
    background-color: transparent;
    border: none;
    border-bottom: 1px solid #e3e3e3;
    font-size: 1.4rem;
    font-weight: 500;
    padding-top: 20px;
    padding-bottom: 20px;
    padding-left: 20px;
    padding-right: 20px;
    &::placeholder {
        color: #acacac;
    }
`;

const UploadContainer = styled.div`
    width: 100%;
    border-bottom: 1px solid #e3e3e3;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    box-sizing: border-box;
`;

const UploadFileContainer = styled.div`
    background-color: #eeeeee;
    border-radius: 10px;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    padding-left: 20px;
    padding-right: 20px;
    padding-top: 75px;
    padding-bottom: 75px;
    align-items: center;
    justify-content: center;
`;

const UploadFileText = styled.span`
    font-size: 1rem;
    font-weight: 500;
    color: #7f7f7f;
`;

const UploadFileIcon = styled.img`
    width: 24px;
    height: 24px;
`;

const UploadText = styled.textarea`
    font-size: 0.9rem;
    font-weight: 400;
    background-color: #eeeeee;
    box-sizing: border-box;
    padding: 15px;
    border: none;
    border-radius: 10px;
    margin-bottom: 20px;
    &::placeholder {
        color: #7f7f7f;
    }
`;

const UploadedImageContainer = styled.div`
    position: relative;
    box-sizing: border-box;
    img {
        box-sizing: border-box;
        width: 100%;
        height: 242.9px;
    }
`;

const DeleteButton = styled.button`
    position: absolute;
    top: 0;
    right: 0;
    background-color: white;
    color: black;
    border: 1px solid black;
    border-radius: 50%;
    width: 24px;
    height: 24px;
    cursor: pointer;
    &:hover {
        background-color: black;
        color: white;
    }
`;

const CategoryContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    box-sizing: border-box;
    padding-left: 20px;
    padding-right: 20px;
    border-bottom: 12px solid #e3e3e3;
`;

const CategoryTitle = styled.span`
    font-size: 1rem;
    font-weight: 500;
    margin-top: 20px;
    margin-bottom: 10px;
`;

const Categories = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    margin-bottom: 20px;
`;

const Category = styled.div`
    width: 105px;
    height: 42px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.9rem;
    cursor: pointer;
    background-color: ${(props) => (props.isSelected ? "#2e90ff" : "#eeeeee")};
    color: ${(props) => (props.isSelected ? "#eeeeee" : "#555555")};
`;

const TagContainer = styled.div`
    display: flex;
    flex-direction: column;
    box-sizing: border-box;
    padding-left: 20px;
    padding-right: 20px;
`;

const TagTitleContainer = styled.div`
    display: flex;
    align-items: center;
    margin-top: 20px;
    margin-bottom: 10px;
`;

const TagTitle = styled.span`
    font-size: 1rem;
    font-weight: 500;
    margin-top: 0;
`;

const TagTitleInfo = styled.span`
    color: #7f7f7f;
    font-size: 0.9rem;
    margin-left: 10px;
`;

const TagInputContainer = styled.div`
    background-color: #eeeeee;
    border-radius: 10px;
    box-sizing: border-box;
    padding: 5px;
    padding-left: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
    margin-bottom: 10px;
    height: 40px;
`;

const TagInput = styled.input`
    background-color: transparent;
    width: 80%;
    height: 3vh;
    font-size: 1rem;
    border: none;
    &::placeholder {
        color: #7f7f7f;
    }
`;

const TagInputIcon = styled.img`
    padding-right: 10px;
    cursor: pointer;
`;

const Tags = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 20px;
`;

const Tag = styled.div`
    background-color: transparent;
    border: 1px solid #434343;
    color: #767676;
    box-sizing: border-box;
    padding-top: 6px;
    padding-bottom: 6px;
    padding-left: 10px;
    padding-right: 10px;
    border-radius: 30px;
    display: flex;
    align-items: center;
`;

const TagDelIcon = styled.img`
    margin-left: 10px;
    cursor: pointer;
`;

const MemeInfoContainer = styled.div`
    box-sizing: border-box;
    padding-left: 20px;
    padding-right: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    border-bottom: 12px solid #e3e3e3;
`;

const MemeInfoText = styled.span`
    font-size: 1rem;
    font-weight: 500;
    margin-top: 20px;
    margin-bottom: 10px;
`;

const SubmitContainer = styled.div`
    box-sizing: border-box;
    padding-left: 20px;
    padding-right: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 50px;
    margin-bottom: 20px;
`;

const SubmitBtn = styled.div`
    width: 100%;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    background-color: #e9e9e9;
    cursor: pointer;
    color: #7b7b7b;
    &:hover {
        background-color: #2e90ff;
        color: white;
    }
`;

const SubmitText = styled.span``;

function CreateContentPage() {
    const navigate = useNavigate();
    const [memeTitle, setMemeTitle] = useState("");
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileUrl, setFileUrl] = useState(null);
    const [uploadText, setUploadText] = useState("");
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [tags, setTags] = useState([]);
    const [inputTag, setInputTag] = useState("");

    const handleMoveMainpage = () => {
        navigate("/");
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setFileUrl(URL.createObjectURL(file));
        }
    };

    const handleFileUploadClick = () => {
        document.getElementById("fileInput").click();
    };

    const handleFileDelete = () => {
        setSelectedFile(null);
        setFileUrl(null);
    };

    const handleSetCategory = (category) => {
        setSelectedCategory(category);
    };

    const handleCreateTag = () => {
        if (inputTag.trim().length > 20) {
            alert("20글자 초과입니다.");
            return;
        }
        if (inputTag.trim() !== "") {
            if (tags.includes(inputTag)) {
                alert("동일한 태그가 존재합니다.");
                return;
            }
            setTags((prev) => [...prev, inputTag]);
            setInputTag("");
        }
    };

    const handleInputChange = (event) => {
        setInputTag(event.target.value);
    };

    const handleTagDelete = (tag) => {
        const newArray = tags.filter((item) => item !== tag);
        setTags(newArray);
    };

    const handleMemeTitleChange = (event) => {
        setMemeTitle(event.target.value);
    };

    const handleUploadTextChange = (event) => {
        setUploadText(event.target.value);
    };

    const handleSubmit = () => {
        if (!memeTitle) {
            alert("밈 제목을 입력해주세요.");
            return;
        }
        if (!selectedFile) {
            alert("밈 파일을 업로드 해주세요.");
            return;
        }
        if (!uploadText) {
            alert("밈 설명을 입력해주세요.");
            return;
        }
        if (!selectedCategory) {
            alert("카테고리를 선택해주세요.");
            return;
        }
        if (tags.length === 0) {
            alert("태그를 하나 이상 추가해주세요.");
            return;
        }

        const memeData = {
            memeTitle,
            fileUrl,
            uploadText,
            selectedCategory,
            tags,
        };

        console.log(JSON.stringify(memeData));
    };

    return (
        <TopContainer>
            <MainContainer>
                <HeaderContainer>
                    <CloseIcon
                        src="imgs/fi-rr-cross.svg"
                        onClick={() => handleMoveMainpage()}
                    />
                    <PageTitle>밈 등록하기</PageTitle>
                </HeaderContainer>

                <MemeTitle
                    placeholder="밈이름을 입력해주세요."
                    value={memeTitle}
                    onChange={handleMemeTitleChange}
                />

                <UploadContainer>
                    {!fileUrl && (
                        <UploadFileContainer onClick={handleFileUploadClick}>
                            <UploadFileIcon src="/imgs/imageIcon.svg" />
                            <UploadFileText
                                style={{
                                    color: "#9D9D9D",
                                    "border-bottom": "2px solid #9D9D9D",
                                    "margin-top": "10px",
                                }}
                            >
                                밈을 업로드 해주세요.
                            </UploadFileText>
                            <UploadFileText
                                style={{
                                    color: "#C4C4C4",
                                    "font-size": "0.9rem",
                                    "margin-top": "10px",
                                }}
                            >
                                (png,jpg 형식)
                            </UploadFileText>
                        </UploadFileContainer>
                    )}

                    <input
                        id="fileInput"
                        type="file"
                        accept="image/png, image/jpeg"
                        style={{ display: "none" }}
                        onChange={handleFileChange}
                    />
                    {fileUrl && (
                        <UploadedImageContainer>
                            <img src={fileUrl} alt="uploadImg" />
                            <DeleteButton onClick={handleFileDelete}>
                                x
                            </DeleteButton>
                        </UploadedImageContainer>
                    )}
                </UploadContainer>

                <MemeInfoContainer>
                    <MemeInfoText>밈 설명</MemeInfoText>
                    <UploadText
                        placeholder="밈에 대한 세부 설명들을 적어주세요."
                        value={uploadText}
                        onChange={handleUploadTextChange}
                    />
                </MemeInfoContainer>

                <CategoryContainer>
                    <CategoryTitle>카테고리</CategoryTitle>
                    <Categories>
                        {["미안", "분노", "큐트", "감사", "웃김"].map(
                            (category) => (
                                <Category
                                    key={category}
                                    isSelected={selectedCategory === category}
                                    onClick={() => handleSetCategory(category)}
                                >
                                    {category}
                                </Category>
                            )
                        )}
                    </Categories>
                </CategoryContainer>

                <TagContainer>
                    <TagTitleContainer>
                        <TagTitle>태그</TagTitle>
                        <TagTitleInfo>
                            태그를 추가해주세요.({tags.length}/10)
                        </TagTitleInfo>
                    </TagTitleContainer>
                    <TagInputContainer>
                        <TagInput
                            id="inputTag"
                            placeholder="태그를 추가해주세요 (1~20글자)"
                            onChange={handleInputChange}
                            value={inputTag}
                        />
                        <TagInputIcon
                            src="imgs/sm-add.svg"
                            onClick={handleCreateTag}
                        />
                    </TagInputContainer>
                    <Tags>
                        {tags.length > 0
                            ? tags.map((tag, index) => (
                                  <Tag key={index}>
                                      <span>#{tag}</span>
                                      <TagDelIcon
                                          src="imgs/tag-close.svg"
                                          onClick={() => handleTagDelete(tag)}
                                      />
                                  </Tag>
                              ))
                            : null}
                    </Tags>
                </TagContainer>
                <SubmitContainer>
                    <SubmitBtn onClick={handleSubmit}>
                        <SubmitText>등록하기</SubmitText>
                    </SubmitBtn>
                </SubmitContainer>
            </MainContainer>
        </TopContainer>
    );
}

export default CreateContentPage;
