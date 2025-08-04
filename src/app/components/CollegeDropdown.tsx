'use client';

import React, { useState, useRef, useMemo } from 'react';
import { List, CellMeasurer, CellMeasurerCache, AutoSizer } from 'react-virtualized';

interface Props {
  value: string;
  onChange: (value: string) => void;
  colleges: string[];
}

const cache = new CellMeasurerCache({
  fixedWidth: true,
  defaultHeight: 48,
});

const CollegeDropdown: React.FC<Props> = ({ value, onChange, colleges }) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const listRef = useRef<List>(null);

  const handleSelect = (college: string) => {
    onChange(college);
    setOpen(false);
    setSearch('');
  };

  const filteredColleges = useMemo(() => {
    return colleges.filter((college) =>
      college.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, colleges]);

  const rowRenderer = ({
    index,
    key,
    style,
    parent,
  }: {
    index: number;
    key: string;
    style: React.CSSProperties;
    parent: any;
  }) => (
    <CellMeasurer
      cache={cache}
      columnIndex={0}
      key={key}
      rowIndex={index}
      parent={parent}
    >
      {({ measure }) => (
        <div
          key={key}
          style={{ ...style, whiteSpace: 'normal' }}
          className="cursor-pointer px-3 py-2 hover:bg-gray-700 break-words text-sm"
          onClick={() => handleSelect(filteredColleges[index])}
          onLoad={measure}
        >
          {filteredColleges[index]}
        </div>
      )}
    </CellMeasurer>
  );

  return (
    <div className="relative w-full text-white font-medium">
      <div
        className="bg-[#252525] font-urbanist font-[700] backdrop-blur-md rounded-xl px-4 py-3 text-[#cccccc] cursor-pointer shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
        onClick={() => setOpen(!open)}
      >
        {value || 'Select your college'}
      </div>

      {open && (
        <div className="absolute z-10 mt-1 w-full h-72 rounded-md bg-[#252525] border border-gray-500 overflow-hidden">
          <div className="p-2">
            <input
              type="text"
              placeholder="Search colleges..."
              className="w-full px-3 py-2 rounded-md bg-[#1e1e1e] text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={search}
              onChange={(e) => {
                cache.clearAll(); // reset measurement cache
                setSearch(e.target.value);
                listRef.current?.recomputeRowHeights();
              }}
            />
          </div>

          <div className="h-[calc(100%-3.5rem)]"> {/* Adjust for input height */}
            <AutoSizer>
              {({ width, height }) => (
                <List
                  width={width}
                  height={height}
                  deferredMeasurementCache={cache}
                  rowHeight={cache.rowHeight}
                  rowRenderer={rowRenderer}
                  rowCount={filteredColleges.length}
                  overscanRowCount={5}
                  ref={listRef}
                />
              )}
            </AutoSizer>
          </div>
        </div>
      )}
    </div>
  );
};

export default CollegeDropdown;
