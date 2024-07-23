import styled from 'styled-components';

const StyledHeader = styled.header`
  background-color: #1C1C1C;
  width: 100%;
  height: 30px;
  padding: 5px;

`;

const StyledImg = styled.img`
height: 20px;
object-fit: cover;`

export default function Header() {
    return(
        <>
            <StyledHeader>
                <StyledImg src="https://files.readme.io/29c6fee-blue_short.svg" />
            </StyledHeader>
        </>
    )
}