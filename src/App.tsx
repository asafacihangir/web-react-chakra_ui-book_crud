import * as React from "react"
import {Box, ChakraProvider, theme, VStack,} from "@chakra-ui/react"
import {ColorModeSwitcher} from "./ColorModeSwitcher"
import {Logo} from "./Logo"
import BookList from "./book-list";

export const App = () => (
    <ChakraProvider theme={theme}>
      <Box fontSize="xl">
        <ColorModeSwitcher justifySelf="flex-end" />
        <VStack spacing={8}>
          <Logo h="10vmin" pointerEvents="none" />
        </VStack>
        <BookList />
      </Box>
    </ChakraProvider>
)
