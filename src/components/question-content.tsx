import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { IoIosClose } from "react-icons/io";

type Question = {
    id: number;
    text: string;
};

const ItemContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    deleteType: 'single' | 'multiple';
}

const ModalBackdrop = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);  // 투명한 어두운 배경
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;  // 모달이 다른 요소들 위에 나타나도록 설정
`;

const ModalContainer = styled.div`
    padding: 30px 50px;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); //중앙
    background-color: white;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-width: 250px;
`;

const Message = styled.div`
    font-weight: bold;
    margin-bottom: 20px; //확인, 취소랑 간격
`;

const ButtonContainer = styled.div`
    display: flex;
    justify-content: center;
`;

const Button = styled.button`
    flex: 1;
    padding: 5px 10px;
    margin: 0 5px;
    border-radius: 5px;
    font-weight: 600;
    cursor: pointer;
    background-color: white;  // 기본 배경색 흰색
    transition: all 0.3s ease;  // 전환 효과 적용

    &:first-child {
        color: #007bff;  // '확인' 버튼 텍스트 색상
        border: 1px solid #007bff;  // '확인' 버튼 테두리 색상

        &:hover {
            background-color: #007bff;  // 호버 시 배경색
            color: white;  // 호버 시 텍스트 색상
        }
    }

    &:last-child {
        color: #6c757d;  // '취소' 버튼 텍스트 색상
        border: 1px solid #6c757d;  // '취소' 버튼 테두리 색상

        &:hover {
            background-color: #6c757d;  // 호버 시 배경색
            color: white;  // 호버 시 텍스트 색상
        }
    }
`;

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose, onConfirm, deleteType }) => {
    if (!isOpen) return null;
    const message = deleteType === 'single' ? '해당 질문을 삭제하시겠어요?' : '선택된 질문을 삭제하시겠어요?';

    return (
        <ModalBackdrop>
            <ModalContainer>
                <Message>{message}</Message>
                <ButtonContainer>
                    <Button onClick={onConfirm}>확인</Button>
                    <Button onClick={onClose}>취소</Button>
                </ButtonContainer>
            </ModalContainer>
        </ModalBackdrop>
    );
};

const QuestionItem: React.FC<{ question: Question; onToggle: Function; onDelete: Function }> = ({ question, onToggle, onDelete }) => {
return (
    <ItemContainer>
        <div>
            <input type="checkbox" onChange={() => onToggle(question.id)} />
            <span>{question.text}</span>
            </div>
        <div>
            <DeleteButton onClick={() => onDelete(question.id)}> 
                <IoIosClose size={21}/>
            </DeleteButton>
        </div>
    </ItemContainer>
    );
};

const ContentContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin: 0 40px;
`;

const ControlsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const DeleteButton = styled.button`
    background-color: transparent;
    border: none;
    cursor: pointer;
`;

const AddButton = styled.button`
    flex: 1; // 버튼이 컨테이너의 전체 너비를 균등하게 차지
    padding: 10px 0;
    margin-top: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`;

const StyledInput = styled.input`
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border: 1px solid gray;  // 그레이 색상 테두리
    border-radius: 5px;  // 둥근 모서리
    box-sizing: border-box;  // 패딩과 테두리가 전체 너비에 포함되도록

    &:focus {
        outline: none;
        border-color: #007bff;  // 포커스 시 테두리 색상 변경
    }
`;

const AddQuestionModal: React.FC<{ isOpen: boolean; onClose: () => void; onAdd: (text: string) => void }> = ({ isOpen, onClose, onAdd }) => {
    const [newQuestionText, setNewQuestionText] = useState("");

    const handleAdd = () => {
        onAdd(newQuestionText);
        setNewQuestionText("");
        onClose();
    };

    if (!isOpen) return null;

    return (
        <ModalBackdrop>
            <ModalContainer>
                <div>
                    <Message>추가할 질문을 입력해주세요</Message>
                    <StyledInput type="text" value={newQuestionText} onChange={(e) => setNewQuestionText(e.target.value)} />
                </div>
                <ButtonContainer>
                    <Button onClick={handleAdd}>확인</Button>
                    <Button onClick={onClose}>취소</Button>
                </ButtonContainer>
            </ModalContainer>
        </ModalBackdrop>
    );
};

const QuestionContent: React.FC = () => {
    const [questions, setQuestions] = useState<Question[]>([
    { id: 1, text: '질문1' },
    { id: 2, text: '질문2' },
    { id: 3, text: '질문3'}
]);
    const [selectedQuestions, setSelectedQuestions] = useState<number[]>([]);
    const [isModalOpen, setModalOpen] = useState(false);
    const [questionToDelete, setQuestionToDelete] = useState<number | null>(null);

    const [isNewQuestionModalOpen, setNewQuestionModalOpen] = useState(false);

    const handleOpenNewQuestionModal = () => {
        setNewQuestionModalOpen(true);
    };

    const handleCloseNewQuestionModal = () => {
        setNewQuestionModalOpen(false);
    };

    const handleAddQuestion = (text: string) => {
        const newQuestion = { id: Math.max(...questions.map(q => q.id)) + 1, text };
        setQuestions(prev => [...prev, newQuestion]);
    };

    const openModal = (id?: number) => {
        setQuestionToDelete(id || null); 
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setQuestionToDelete(null);
    };

    const confirmDelete = () => {
        if (questionToDelete !== null) {
            // 하나만 삭제
            handleDelete(questionToDelete);
        } else {
            // 선택 삭제
            handleDeleteSelected();
        }
        closeModal();
    };

    const handleToggle = (id: number) => {
        setSelectedQuestions(prev =>
            prev.includes(id) ? prev.filter(qId => qId !== id) : [...prev, id]
        );
    };

    const handleDelete = (id: number) => {
        setQuestions(prev => prev.filter(question => question.id !== id));
        setSelectedQuestions(prev => prev.filter(qId => qId !== id));
    };

    const handleDeleteSelected = () => {
        setQuestions(prev => prev.filter(question => !selectedQuestions.includes(question.id)));
        setSelectedQuestions([]);
    };

return (
    <ContentContainer>
        <ControlsContainer>
            <div>
                <input type="checkbox"/>
                <label>전체 | 총 <strong>{questions.length}</strong>개의 질문</label>
            </div>
            <DeleteButton onClick={() => openModal()}>선택 삭제</DeleteButton>
        </ControlsContainer>
        {questions.map(question => (
    <QuestionItem key={question.id} question={question} onToggle={handleToggle} onDelete={() => openModal(question.id)} />
    ))}
        <ConfirmationModal isOpen={isModalOpen} onClose={closeModal} onConfirm={confirmDelete}
        deleteType={questionToDelete !== null ? 'single' : 'multiple'}/>
        <AddButton onClick={handleOpenNewQuestionModal}>질문 추가 등록</AddButton>
        <AddQuestionModal isOpen={isNewQuestionModalOpen} onClose={handleCloseNewQuestionModal} onAdd={handleAddQuestion} />
    </ContentContainer>
    );
};
export default QuestionContent;