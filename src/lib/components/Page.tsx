import { Center } from '@chakra-ui/react';
import React from 'react';

const Page: React.FC = ({ children }) => (
	<Center className="center-vertically" style={{ paddingBottom: '3.5rem' }}>
		{/* 3.5 rem to offset theme switcher header height */}
		{children}
	</Center>
);

export default Page;
