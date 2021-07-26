import { screen, render, fireEvent } from '@shared/tests';
import * as React from 'react';
import { complexDataSet } from '../../resources/DemoProps';
import { BarChart } from './BarChart';
import { createPassThroughPropsTest } from '@shared/tests/utils';

const dimensions = [
  {
    accessor: 'name',
    interval: 0
  }
];
const measures = [
  {
    accessor: 'users',
    label: 'Users',
    formatter: (val) => val.toLocaleString()
  },
  {
    accessor: 'sessions',
    label: 'Active Sessions',
    formatter: (val) => `${val} sessions`,
    hideDataLabel: true
  },
  {
    accessor: 'volume',
    label: 'Vol.'
  }
];

describe('BarChart', () => {
  it('Renders with data', () => {
    const { asFragment, container } = render(
      <BarChart dataset={complexDataSet} dimensions={dimensions} measures={measures} />
    );

    // Check if a single responsive container is rendered
    const responsiveContainers = container.querySelectorAll('div.recharts-responsive-container');
    expect(responsiveContainers.length).toBe(1);

    // Check if bar chart container, bars and single bars are rendered
    const barChartContainer = container.querySelector('g.recharts-bar');
    expect(barChartContainer).toBeInTheDocument();
    const barContainer = barChartContainer.querySelectorAll('g.recharts-bar-rectangles');
    expect(barContainer.length).toBeGreaterThanOrEqual(1);
    const singleBars = barChartContainer.querySelectorAll('g.recharts-bar-rectangle');
    expect(singleBars.length).toBeGreaterThanOrEqual(1);

    // Check if snapshot matches render
    expect(asFragment()).toMatchSnapshot();
  });

  it('Check onClick events', () => {
    const onClick = jest.fn();
    const onLegendClick = jest.fn();
    const { asFragment, container } = render(
      <BarChart
        onClick={onClick}
        onLegendClick={onLegendClick}
        dataset={complexDataSet}
        dimensions={dimensions}
        measures={measures}
      />
    );

    // Check if click on axis label is working
    const firstYAxisLabel = screen.getByText(/January/);
    fireEvent.click(firstYAxisLabel);
    expect(onClick).toBeCalled();

    // Check if click on legend is working
    const legendContainer = screen.getByText(/Active Sessions/);
    fireEvent.click(legendContainer);
    expect(onLegendClick).toBeCalled();

    // Check if click in column chart container is working
    fireEvent.click(container.querySelector('g.recharts-bar'));
    expect(onClick).toBeCalled();

    // Check if snapshot matches render
    expect(asFragment()).toMatchSnapshot();
  });

  it('loading placeholder', () => {
    const { container, asFragment } = render(<BarChart dimensions={[]} measures={[]} />);

    // Check if no responsive container is rendered
    const responsiveContainers = container.querySelectorAll('div.recharts-responsive-container');
    expect(responsiveContainers.length).toBe(0);

    // Check if no column chart container is rendered
    const columnChartContainer = container.querySelector('g.recharts-bar');
    expect(columnChartContainer).toBeNull();

    // Check if snapshot matches render
    expect(asFragment()).toMatchSnapshot();
  });

  it('onLegendClick', () => {
    const cb = jest.fn((e) => {
      e.persist();
    });
    render(<BarChart dataset={complexDataSet} dimensions={dimensions} measures={measures} onLegendClick={cb} />);
    fireEvent.click(screen.getByText('Users'));
    expect(cb).toBeCalled();
    expect(cb.mock.calls[0][0].detail.dataKey).toEqual('users');
  });

  it('onLegendClick should not crash when invalid handler is provided', () => {
    render(
      <BarChart dataset={complexDataSet} dimensions={dimensions} measures={measures} onLegendClick={'123' as any} />
    );

    expect(() => {
      fireEvent.click(screen.getByText('Users'));
    }).not.toThrow();
  });

  createPassThroughPropsTest(BarChart, { dimensions: [], measures: [] });
});
