import styled from "styled-components";

export const Wrapper = styled.div`
	justify-content: space-between;
	font-family: Arial, Helvetica, sans-serif;
	border-bottom: 1px solid black;
	padding-bottom: 20px;
	.item {
		justify-content: space-between;
		display: flex;
		padding-bottom: 10px;
	}
	img {
		object-fit: cover;
		margin-left: 45px;
		max-width: 150px;
		padding: 30px;
	}
`;
