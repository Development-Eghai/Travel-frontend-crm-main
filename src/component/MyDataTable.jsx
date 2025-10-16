
import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/material';
import { CircularProgress } from "@mui/material";

const MyDataTable = ({ rows = [], columns = [], getRowId, isLoading = false }) => {
    const [paginationModel, setPaginationModel] = useState({
        pageSize: 10,
        page: 0,
    });
    return (
        <Box sx={{ width: '100%', overflowX: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            {isLoading ? (
                <Box sx={{ textAlign: 'center' }}>
                     <CircularProgress />
                </Box>
            ) : (
                <Box sx={{ width: 'max-content', minWidth: '100%' }}>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        getRowId={getRowId}
                        paginationModel={paginationModel}
                        onPaginationModelChange={setPaginationModel}
                        pageSizeOptions={[10, 20, 30]}
                        disableVirtualization
                        columnBuffer={4}
                    />
                </Box>
            )}
        </Box>
    );
};

export default MyDataTable;
