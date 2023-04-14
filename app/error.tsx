'use client';

import React from 'react';
import { useEffect } from 'react';

import EmptyState from './components/shared/EmptyState';

interface ErrorStateProps {
  error: Error
}

const ErrorStae = ({error}: ErrorStateProps) => {
	useEffect(() => {
		console.error(error);
	}, [error]);
  
	return (
		<EmptyState title='Uh Oh' subtitle='Something went wrong'/>
	);
};

export default ErrorStae;