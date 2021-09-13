import React from 'react'
import styled from 'styled-components'


const AvatarContainer = styled.div`
  color: RoyalBlue;
  font-weight: normal;
  text-decoration: none;
  line-height: 0; /* remove line-height */
  display: inline-block; /* circle wraps image */
  margin-right: 5px;
  border: 2px solid rgba(255, 1, 1, 0.541);
  border-radius: 50%; /* relative value */
  /*box-shadow: 0px 0px 5px rgba(0,0,0,0.4);*/
  transition: linear 0.25s;
  height: 36px;
  width: 36px;

  &:hover {
    transition: ease-out 0.2s;
    border: 2px solid rgba(206, 202, 202, 0.8);
    -webkit-transition: ease-out 0.2s;
  }

  img {
    border-radius: 50%; /* relative value for
				   adjustable image size */
    max-width: 100%;
    max-height: 100%;
  }
`;

function Avatar({src,marginTop}) {
  const style= {"marginTop":marginTop}
    return (
        <AvatarContainer style={style}>
            <img src={src} alt="avatar component"></img>
        </AvatarContainer>
    )
}

export default Avatar
