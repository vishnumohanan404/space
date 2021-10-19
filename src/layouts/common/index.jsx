import styled from "styled-components";

export const BoxContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10px;
`;

export const FormContainer = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  /* box-shadow: 0px 0px 2.5px rgba(15, 15, 15, 0.19); */
`;

export const MutedLink = styled.span`
  font-size: 11px;
  color: rgba(200, 200, 200, 0.8);
  font-weight: 500;
  text-decoration: none;
  text-align: center;
`;

export const BoldLink = styled.a`
  font-size: 11px;
  color: rgb(4, 177, 225);
  font-weight: 500;
  text-decoration: none;
  margin: 0 4px;
`;

export const Input = styled.input`
  width: 100%;
  height: 42px;
  outline: none;
  /* border: 1px solid rgba(200, 200, 200, 0.3); */
  border: none;
  padding: 0px 10px;
  border-bottom: 1.4px solid transparent;
  transition: all 200ms ease-in-out;
  font-size: 12px;
  font-family: "Poppins", sans-serif;

  &::placeholder {
    color: rgba(200, 200, 200, 1);
  }

  &:not(:last-of-type) {
    border-bottom: 1.5px solid rgba(200, 200, 200, 0.4);
  }

  &:focus {
    outline: none;
    border-bottom: 2px solid rgb(241, 196, 15);
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 11px 40%;
  color: #fff;
  font-size: 15px;
  font-weight: 600;
  font-family: "Poppins", sans-serif;
  border: none;
  border-radius: 100px 100px 100px 100px;
  cursor: pointer;
  transition: all, 240ms ease-in-out;
  background: rgb(4, 177, 225);
  background: linear-gradient(
    90deg,
    rgba(4, 177, 225, 1) 0%,
    rgba(0, 186, 224, 1) 18%,
    rgba(11, 158, 226, 1) 51%,
    rgba(13, 151, 226, 1) 74%,
    rgba(36, 90, 229, 1) 100%,
    rgba(51, 51, 231, 1) 100%
  );

  &:focus {
    filter: brightness(1.03);
  }

  &:hover {
    filter: brightness(1.03);
  }

  &:display {
    filter: contrast(0.7);
  }
`;

export const FieldContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const FieldError = styled.span`
  color: #b32e32;
  font-size: 11px;
  min-height: 18px;
`;

export const FormSuccess = styled.span`
  color: #28a828;
  font-size: 12px;
  min-height: 20px;
`;

export const FormError = styled.span`
  color: #b32e32;
  font-size: 12px;
  min-height: 20px;
  align-self: flex-start;
`;

export const UserNameText = styled.p`
  padding-left: 5px;
  font-weight: 500;
  color: #626262;
  font-family: "Noto sans", sans-serif;
`;

export const CircularContainer = styled.a`
  height: 36px;
  width: 36px;
  background-color: #bbb;
  border-radius: 50%;
  display: flex;
  margin-right: 10px;
  align-items: center;
  justify-content: center;
  transition: filter 300ms;

  &:hover {
    filter: brightness(1.2);
  }
`;

export const LoadingWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const HeadingStyle = styled.h4`
  font-weight: 600;
  font-size: 16px;
  margin: 0;
`;

export const NoValueHeader = styled.h4`
  font-weight: 400;
  font-size: 14px;
  margin: 0;
  color: #a1a1a1;
  justify-content: center;
`