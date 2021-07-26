import React, { ComponentType } from 'react';
import { render } from '@shared/tests';
import { fireEvent, screen } from '@shared/tests/index';

enum ChartQuery {
  'BarChart' = 'g.recharts-bar',
  'ColumnChart' = 'g.recharts-bar',
  'LineChart' = 'g.recharts-line'
}

enum ChartChildrenQuery {
  'ColumnChart' = 'g.recharts-bar-rectangles',
  'BarChart' = 'g.recharts-bar-rectangles',
  'LineChart' = 'path'
}

export const createChartRenderTest = (Component: ComponentType<any>, props: {}) => {
  it('Render chart with data', () => {
    const { asFragment, container } = render(<Component {...props} />);

    const chartQueryType = ChartQuery[Component.displayName];
    const chartChildrenType = ChartChildrenQuery[Component.displayName];

    if (Component.displayName !== 'ColumnChartWithTrend') {
      // Check if a single responsive container is rendered
      const responsiveContainers = container.querySelectorAll('div.recharts-responsive-container');
      expect(responsiveContainers.length).toBe(1);

      // Check if a single chart is rendered
      const chartContainer = container.querySelector(chartQueryType);
      expect(chartContainer).toBeInTheDocument();
      const chartChildrenContainer = chartContainer.querySelectorAll(chartChildrenType);
      expect(chartChildrenContainer.length).toBeGreaterThanOrEqual(1);
      const children = chartContainer.querySelectorAll(chartChildrenType);
      expect(children.length).toBeGreaterThanOrEqual(1);
    }

    // Check if snapshot matches render
    expect(asFragment()).toMatchSnapshot();
  });
};

export const createOnClickChartTest = (Component: ComponentType<any>, props: {}) => {
  it('Check onClick events', () => {
    const onClick = jest.fn();
    const onLegendClick = jest.fn((e) => {
      e.persist();
    });
    const { asFragment, container } = render(<Component onClick={onClick} onLegendClick={onLegendClick} {...props} />);

    const chartQueryType = ChartQuery[Component.displayName];

    if (Component.displayName !== 'ColumnChartWithTrend') {
      // Check if click on axis label is working
      const firstYAxisLabel = screen.getByText(/January/);
      fireEvent.click(firstYAxisLabel);
      expect(onClick).toBeCalled();

      // Check if click in column chart container is working
      fireEvent.click(container.querySelector(chartQueryType));
      expect(onClick).toBeCalled();

      fireEvent.click(screen.getByText('Users'));
      expect(onLegendClick).toBeCalled();
      expect(onLegendClick.mock.calls[0][0].detail.dataKey).toEqual('users');
    }

    // Check if snapshot matches render
    expect(asFragment()).toMatchSnapshot();
  });
};
