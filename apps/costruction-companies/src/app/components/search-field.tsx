import { SearchIcon } from '@chakra-ui/icons';
import {
  Input,
  InputGroup,
  InputProps,
  InputRightElement,
} from '@chakra-ui/react';

type SearchFieldProps = Pick<InputProps, 'value' | 'onChange'>;

export default function SearchField(props: SearchFieldProps) {
  return (
    <InputGroup>
      <Input
        placeholder="Search by company name"
        size={'md'}
        variant={'flushed'}
        {...props}
      />
      <InputRightElement pointerEvents={'none'} children={<SearchIcon />} />
    </InputGroup>
  );
}
