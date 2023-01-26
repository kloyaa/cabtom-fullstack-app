import {
  Box,
  Flex,
  Avatar,
  HStack,
  Link,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon, AddIcon } from '@chakra-ui/icons';
import { useCookie, useLocation } from 'react-use';
import { useNavigate } from 'react-router-dom';
import { BiCart } from 'react-icons/bi';
import { v4 as uuidv4 } from 'uuid';

const Links = [
  { title: 'Transactions', path: "/dashboard" },
  { title: 'Account', path: "/user/client/profile" },
  { title: 'News', path: "/news" }
];

const NavLink = ({ children }) => {
   return <Link
   px={2}
   py={1}
   rounded={'md'}
   _hover={{
     textDecoration: 'none',
     bg: useColorModeValue('gray.200', 'gray.700'),
   }}
   color={useColorModeValue("teal", "gray.300")}
   fontSize={{ base: "smaller", md: "small" }}
   fontWeight={{ base: "medium", md: "normal" }}
   cursor={"pointer"}
   onClick={() => {}}>
   {children}
 </Link>;
}

function ClientNavbar({ orderBtnFunction }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [authToken, setAuthToken, deleteAuthToken] = useCookie("authToken");

  const { isOpen, onOpen, onClose } = useDisclosure();

  const onLogout = () => {
    deleteAuthToken();
    navigate("/");
  }

  return <>
  <Box bg={useColorModeValue("white", "gray.900")} px={4}>
    <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
      <IconButton
        size={'md'}
        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
        aria-label={'Open Menu'}
        display={{ md: 'none' }}
        onClick={isOpen ? onClose : onOpen}
      />
      <HStack spacing={8} alignItems={'center'}>
        <Box
            fontWeight={"black"}
            color={useColorModeValue("teal", "gray.300")}
            cursor={"pointer"}
            onClick={() => navigate("/dashboard")}>CABTOM</Box>

        <HStack
          as={'nav'}
          spacing={4}
          display={{ base: 'none', md: 'flex' }}>
          {Links.map((link) => (
            <NavLink key={uuidv4()}>
              <Box onClick={() => navigate(link.path)}>
                {link.title}
              </Box>
            </NavLink>
          ))}
        </HStack>
      </HStack>
      <Flex alignItems={'center'}>
        {location.pathname === "/dashboard" && <Button
          variant={'solid'}
          colorScheme={'teal'}
          size={'sm'}
          mr={4}
          leftIcon={<BiCart />}
          onClick={() => orderBtnFunction()}>
          Order
        </Button>}
        <Menu>
          <MenuButton
            as={Button}
            rounded={'full'}
            variant={'link'}
            cursor={'pointer'}
            minW={0}>
            <Avatar
              size={'sm'}
              src={
                'https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
              }
            />
          </MenuButton>
          <MenuList>
            <MenuItem>Order</MenuItem>
            <MenuItem>Transactions</MenuItem>
            <MenuItem>Account Settings</MenuItem>
            <MenuDivider />
            <MenuItem onClick={() => onLogout()}>Sign out</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
    </Flex>

    {isOpen ? (
      <Box pb={4} display={{ md: 'none' }}>
        <Stack as={'nav'} spacing={4}>
          {Links.map((link) => (
            <NavLink key={uuidv4()}>
              <Box onClick={() => navigate(link.path)}>
                {link.title}
              </Box>
            </NavLink>
          ))}
        </Stack>
      </Box>
    ) : null}
  </Box>
</>
}

export default ClientNavbar;
