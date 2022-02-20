import { Avatar, Box, Heading, Text } from '@chakra-ui/react';
import { Company } from '@cosuno/api-interfaces';

type CompanyCardProps = {
  company: Company;
};

export default function CompanyCard({ company }: CompanyCardProps) {
  return (
    <Box rounded={'lg'} textAlign={'center'}>
      <Avatar
        size={'xl'}
        src={company.logo}
        mb={4}
        pos={'relative'}
        _after={{
          content: '""',
          w: 4,
          h: 4,
          bg: 'green.300',
          border: '2px solid white',
          rounded: 'full',
          pos: 'absolute',
          bottom: 0,
          right: 3,
        }}
      />
      <Heading fontSize={'2xl'} fontFamily={'body'}>
        {company.name}
      </Heading>
      <Heading fontSize={'md'} fontFamily={'body'}>
        [{company.city}]
      </Heading>
      <Text fontWeight={600} color={'gray.500'} mb={4}>
        {company.specialties.join(', ')}
      </Text>
    </Box>
  );
}
