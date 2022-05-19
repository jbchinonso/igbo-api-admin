import React, { ReactElement } from 'react';
import { Box, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { Search2Icon } from '@chakra-ui/icons';
import { useListFilterContext } from 'react-admin';
import Collection from 'src/shared/constants/Collections';
import Input from 'src/shared/primitives/Input';
import FilterInterface from './FilterInterface';

const CustomFilter = (props: FilterInterface): ReactElement => {
  const { setFilters, filterValues } = useListFilterContext(props);
  const { resource } = props;
  const filterKey = resource === Collection.EXAMPLES || resource === Collection.EXAMPLE_SUGGESTIONS
    ? 'example'
    : 'word';
  return (
    <Box className="flex items-end lg:ml-4">
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
        >
          <Search2Icon color="gray.300" />
        </InputLeftElement>
        <Input
          data-test="search-bar"
          className="h-10 w-full lg:w-64 bg-gray-300 px-4 rounded-lg border border-solid border-gray-400"
          onChange={(e) => setFilters({ ...filterValues, [filterKey]: e.target.value }, null)}
          placeholder="Search by word"
          defaultValue={typeof filterValues?.[filterKey] === 'string' ? filterValues[filterKey] : ''}
          style={{ paddingLeft: 34 }}
        />
      </InputGroup>
    </Box>
  );
};

const Filter = (props: any): ReactElement => (
  <CustomFilter {...props} />
);

export default Filter;
