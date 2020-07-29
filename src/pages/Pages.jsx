import React from "react";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import { withRouter } from "react-router-dom";
import pagesData from "./pagesData";
import { NavLink, Link, useHistory } from "react-router-dom";

const Pages = (props) => {
  const [data, setData] = React.useState(pagesData);

  const tableRows = Object.values(data).map((pageInfo) => (
    <TableRow>
      <TableCell>
        <Box display="flex" justifyContent="space-between">
          <Box
            fontFamily="Monospace"
            fontSize="16px"
            display="flex"
            alignItems="center"
          >
            {pageInfo.page}
          </Box>
          <Box>
            <IconButton onClick={() => handleFavoritedPages(pageInfo.page)}>
              {data[pageInfo.page].favorited ? (
                <FavoriteIcon />
              ) : (
                <FavoriteBorderIcon />
              )}
            </IconButton>
          </Box>
        </Box>
      </TableCell>
      <TableCell>{pageInfo.visitorCount}</TableCell>
      <TableCell>{pageInfo.averageTimeOnPage + " minutes"}</TableCell>
      <TableCell>{pageInfo.creationDate}</TableCell>
      <TableCell>{pageInfo.reviewerScore}</TableCell>
      <TableCell>
        <Link to={"/review" + pageInfo.page}>Review Page</Link>
      </TableCell>
    </TableRow>
  ));

  // Methods
  const handleFavoritedPages = (page) => {
    let oldData = data;
    let pageData = oldData[page];
    let oldFavorited = pageData.favorited;
    let newPageData = { ...pageData, favorited: !oldFavorited };
    let newData = { ...oldData, [page]: newPageData };
    setData(newData);
  };

  return (
    <Container>
      <Box clone fontWeight="fontWeightBold" textAlign="center">
        <Typography variant="h3" gutterBottom>
          Pages of https://www.coolchristine.com
        </Typography>
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Page</TableCell>
              <TableCell>Visitor Count</TableCell>
              <TableCell>Average Time on Page</TableCell>
              <TableCell>Creation Date</TableCell>
              <TableCell>Reviewer Score</TableCell>
              <TableCell>Review Page</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>{tableRows}</TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default withRouter(Pages);
